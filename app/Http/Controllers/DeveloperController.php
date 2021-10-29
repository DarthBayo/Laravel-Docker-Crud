<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Developer as Dev;
use Carbon\Carbon;

class DeveloperController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $devs = Dev::get();
        return response()->json($devs, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $status = 404;

        foreach($data as $key => $value) {
            if (empty($value))
                return response()->json([ 'message' => $key.' cannot be empty' ], $status);
        }

        $data['idade'] = Carbon::now()->diffInYears(Carbon::parse($data['datanascimento']));
        $dev = Dev::create([
            'nome' => $data['nome'],
            'sexo' => $data['sexo'][0],
            'idade' => $data['idade'],
            'hobby' => $data['hobby'],
            'datanascimento' => $data['datanascimento']
        ]);
        !empty($dev) && $status = 200;

        return response()->json([], $status);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $devs = Dev::find($id);
        $status = 200;

        empty($devs) && $status = 404;

        return response()->json($devs, $status);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();
        $status = 400;

        foreach($data as $key => $value) {
            if (empty($value))
                return response()->json([ 'message' => $key.' cannot be empty' ], $status);
        }

        $dev = Dev::find($id);

        $data['idade'] = Carbon::now()->diffInYears(Carbon::parse($data['datanascimento']));
        if (!empty($dev)) {
            $dev->nome = $data['nome'];
            $dev->sexo = $data['sexo'][0];
            $dev->idade = $data['idade'];
            $dev->hobby = $data['hobby'];
            $dev->datanascimento = $data['datanascimento'];
            $dev->save();

            $status = 200;
        }

        return response()->json([], $status);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $dev = Dev::find($id);
        $status = 204;

        if (!empty($dev))
            $dev->delete();
        else
            $status = 400;

        return response()->json([], $status);
    }
}
